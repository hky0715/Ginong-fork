package kr.co.ginong.web.service.admin;

import kr.co.ginong.web.entity.member.Member;
import kr.co.ginong.web.entity.member.MemberView;
import kr.co.ginong.web.repository.member.AdminMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("adminMemberServiceImp")
public class MemberServiceImp implements MemberService {

    @Autowired
    private AdminMemberRepository repository;

    int size = 20;

    @Override
    public List<Member> getList(int page, String query) {
        int offset = (page-1) * size;
        List<Member> list = repository.findAll(query, offset, size);

        return list;
    }

    @Override
    public List<Member> getList(int page) {
        return getList(page, null);
    }

    @Override
    public int getCount(String query) {
        int count = repository.count(query);

        return count;
    }

    @Override
    public int getCount() {
        int count = repository.count(null);

        return count;
    }

    @Override
    public MemberView get(Long memberId) {

        MemberView member = repository.findById(memberId);

        return member;
    }



}